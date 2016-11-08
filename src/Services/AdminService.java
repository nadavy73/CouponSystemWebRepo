package Services;

import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import Exceptions.*;
import Facades.*;
import JavaBeans.*;

@Path("admin")
public class AdminService {
//bla
	@Context
	private HttpServletRequest request;
	private static final String FACADE_KEY = "facade";

	public AdminService() {

	}

	@POST
	@Path("/login/{name}/{password}")
	@Produces(MediaType.TEXT_PLAIN)
	public String login(@PathParam("name")String userName, 
			@PathParam("password")String password)
	{
		try{
			AdminFacade af= new AdminFacade().login(userName, password, ClientType.ADMIN);
			request.getSession().setAttribute(FACADE_KEY, af);
			return "login successfull";
		}
		catch(LoginException e)
		{
			return "login failed";
		}
		
	}
	@PUT
	@Path("/createCompany")
	@Produces(MediaType.APPLICATION_JSON)
	public Company createCompany (Company company) 
			throws AdminFacadeException
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.createCompany(company);
		} catch (AdminFacadeException | AlreadyExistException e) {
			e.printStackTrace();
		}
			return company;
	}
	
	@DELETE
	@Path("/removeCompany")
	@Produces(MediaType.APPLICATION_JSON)
	public Company removeCompany(Company company) 
	
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.removeCompany(company);
		} catch (AdminFacadeException e) {
			e.printStackTrace();
		}
			return company;
	}
	
	@PUT
	@Path("/updateCompany")
	@Produces(MediaType.APPLICATION_JSON)
	public Company updateCompany(Company company) 
		
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.UpdateCompany(company);
		} catch (AdminFacadeException e) {
			e.printStackTrace();
		}
			return company;
	}
	
	
	@GET
	@Path("/getCompany")
	@Produces(MediaType.APPLICATION_JSON)
	public Company getCompany(long compId) 
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.GetCompany(compId);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	@GET
	@Path("/getCompanyByName")
	@Produces(MediaType.APPLICATION_JSON)
	public Company GetCompanyByName (String compName)	
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.GetCompanyByName(compName);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	@GET
	@Path("/getallcompanies")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Company> getAllCompanies()
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.getAllCompanies();
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@PUT
	@Path("/createCustomer")
	@Produces(MediaType.APPLICATION_JSON)
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
	
	
	@PUT
	@Path("/updateCustomer")
	@Produces(MediaType.APPLICATION_JSON)
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

	@GET
	@Path("/getCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	public Customer getCustomer(long custId) 
	{
		AdminFacade facade = (AdminFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.GetCustomer(custId);
		} catch (AdminFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}

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
