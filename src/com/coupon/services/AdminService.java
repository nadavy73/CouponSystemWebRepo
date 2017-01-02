package com.coupon.services;

import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.xml.bind.annotation.XmlRootElement;

import Exceptions.*;
import Facades.*;
import JavaBeans.*;

@XmlRootElement
@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
public class AdminService {

	@Context
	private HttpServletRequest request;
	private static final String FACADE_KEY = "facade";
	
	public class returnValue {
		public String status = "ok";
	}
	
	
	public AdminService() {

	}
	//V
	@POST
	@Path("/login/{username}/{password}")
	@Produces(MediaType.TEXT_PLAIN)
	public String login(@PathParam("username") String username, 
			@PathParam("password")String password)
	{
		try{
			
			new AdminFacade();
			AdminFacade af= AdminFacade.login(username, password);
			request.getSession().setAttribute(FACADE_KEY, af);
			return "ok";
		}
		catch(LoginException e)
		{
			return "login failed";
		}
		
	}
	
	//V 
	@PUT
	@Path("/createCompany")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Company createCompany (Company company) 
			throws AdminFacadeException
	{
		System.out.println(company);
		
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			int companyId = facade.createCompany(company);
			company.setId(companyId);
		} catch (AdminFacadeException | AlreadyExistException e) {
			e.printStackTrace();
		}
			return company;
	}
	
		//Update Company
		@POST 
		@Path("/updateCompany")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Company updateCompany(Company company) 
			
		{
			AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
			
			
			try {
				facade.UpdateCompany(company);
			} catch (AdminFacadeException  e) {
				e.printStackTrace();
			}
				return company;
		}
	
	//Delete Company 
	@DELETE
	@Path("/removeCompany/{customerId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Company removeCompany(@PathParam("customerId")long id) throws AdminFacadeException, DoesNotExistException 
	
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		Company company = facade.GetCompany(id);

		try {
			facade.removeCompany(company);
			} catch (AdminFacadeException e) {
			e.printStackTrace();
		}
			return company;
	}
	
	
	//V
	@GET
	@Path("/getCompanyByID/{compId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Company getCompany(@PathParam("compId") long compId) 
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.GetCompany(compId);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	//V
	@GET
	@Path("/getCompanyByName/{compName}")
	@Produces(MediaType.APPLICATION_JSON)
	public Company GetCompanyByName (@PathParam("compName") String compName)	
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.GetCompanyByName(compName);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	//V
	@GET
	@Path("/getallcompanies")
	@Produces(MediaType.APPLICATION_JSON)
	public Company[] getAllCompanies()
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			for (Company company : facade.getAllCompanies()) {
				
			System.out.println("$$$$$$$$$$$$$$$$$$$");	
			System.out.println(company);
			System.out.println("$$$$$$$$$$$$$$$$$$$");
			}
			
			return facade.getAllCompanies().toArray(new Company[]{});
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	//V
	@PUT
	@Path("/createCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Customer createCustomer (Customer customer) 

	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.createCustomer(customer);
		} catch (AdminFacadeException | AlreadyExistException e) {
			e.printStackTrace();
		}
			return customer;
	}

	//V
	@DELETE
	@Path("/removeCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	public Customer removeCompany(Customer customer) 
	
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.RemoveCustomer(customer);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
			return customer;
	}
	
	//V
	@POST 
	@Path("/updateCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Customer updateCustomer(Customer customer) 
		
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.UpdateCustomer(customer);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
			return customer;
	}
	
		
	//V
	@GET
	@Path("/getCustomerByID/{custId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Customer getCustomer(@PathParam("custId") long custId) 
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.GetCustomer(custId);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}


	//V
	@GET
	@Path("/getAllCustomers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Customer> getAllCustomers()
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.getAllCustomers();
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}