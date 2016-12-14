package com.coupon.services;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.xml.bind.annotation.XmlRootElement;
import Exceptions.*;
import Facades.*;
import JavaBeans.*;


@XmlRootElement
@Path("/company")
@Produces(MediaType.APPLICATION_JSON)
public class CompanyService {

	@Context
	private HttpServletRequest request;
	private static final String FACADE_KEY = "facade";

	public CompanyService() {

	}
	//V
	@POST
	@Path("/login/{username}/{password}")
	@Produces(MediaType.TEXT_PLAIN)
	public String login(@PathParam("username")String username, 
			@PathParam("password")String password)
	{
		try{
			CompanyFacade cf= new CompanyFacade().login(username, password, ClientType.COMPANY);
			request.getSession().setAttribute(FACADE_KEY, cf);
			return "login successfull";
		}
		catch(LoginException e)
		{
			return "login failed";
		}
		
	}

	//V
	@POST
	@Path("/createCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon createCoupon(Coupon coupon) throws CompanyFacadeException, AlreadyExistException {	
	
		System.out.println("**************** " + coupon);
		
		CompanyFacade cf = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
	
		

		try {
			cf.createCoupon(coupon);
		} catch (AlreadyExistException e) {
			e.printStackTrace();
		}
			return coupon;
	}
	
	
	//V
	@DELETE
	@Path("/removeCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Coupon removeCoupon (Coupon coupon) 
			
	{
		CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.removeCoupon(coupon);
		} catch (CompanyFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
			return coupon;
	}
	
	
	//V
	@POST
	@Path("/updateCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Coupon updateCoupon (Coupon coupon) 
			
	{
		CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.updateCoupon(coupon);
		} catch (CompanyFacadeException | DoesNotExistException e) {
			e.printStackTrace();
		}
			return coupon;
	}
	
	//V
	@GET
	@Path("/getCoupon/{couponId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon getCoupon(@PathParam("couponId") long couponId) 
	{
		CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.getCoupon(couponId);
		} catch (CompanyFacadeException| DoesNotExistException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
}

