package com.coupon.services;

import java.time.LocalDate;
import java.util.Collection;

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
	
	public class returnValue {
		public String status = "ok";
	}
	
	
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
			return "ok";
		}
		catch(LoginException e)
		{
			return "login failed";
		}
		
	}

	//V
	@PUT
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
	@Path("/removeCoupon/{couponId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Coupon removeCoupon (@PathParam("couponId") long couponId) throws CompanyFacadeException, DoesNotExistException 
			
	{
		CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
		
		Coupon coupon= facade.getCoupon(couponId);
		
			facade.removeCoupon(coupon);
		
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
	@POST
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
	
		//getAllCoupons()
		@GET
		@Path("/getAllCoupons")
		@Produces(MediaType.APPLICATION_JSON)
		public Collection<Coupon> getAllCoupons() throws CompanyFacadeException, DoesNotExistException {
			//getting the companyFacade saved in the session
			CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
			//the getAllCoupons function
			return facade.getAllCoupon();
		}
		
		//getCouponByType
		@POST
		@Path("/getCouponByType")
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.APPLICATION_JSON)
		public Coupon[] getCouponByType(String type) throws CompanyFacadeException, DoesNotExistException {
			//getting the companyFacade saved in the session
			CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
			CouponType couponType = CouponType.valueOf(type);
			// get by type
			return facade.getCouponByType(couponType).toArray(new Coupon[]{});
		}
		
		//getCouponByPrice(double price)
		@POST
		@Path("/getCouponByPrice")
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.APPLICATION_JSON)
		public Coupon[] getCouponByPrice(double price) throws CompanyFacadeException, DoesNotExistException {
			//getting the companyFacade saved in the session
			CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
			//the getCouponByPrice function
			return facade.getCouponsByPrice(price).toArray(new Coupon[]{});
		}
		
		//getCouponByStartDate
		@POST
		@Path("/getCouponByStartDate")
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.APPLICATION_JSON)
		public Coupon[] getCouponByStartDate(String startDate) throws CompanyFacadeException, DoesNotExistException {
			//getting the companyFacade saved in the session
			CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
			// Parsing LocalDate 
			LocalDate startLocalDate = LocalDate.parse(startDate);
			//the getCouponByStartDate function
			return facade.getCouponsByStartDate(startLocalDate).toArray(new Coupon[]{});
		}
		
		//getCouponByEndDate
		@POST
		@Path("/getCouponByEndDate")
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.APPLICATION_JSON)
		public Coupon[] getCouponByEndDate(String endDate) throws CompanyFacadeException, DoesNotExistException {
			//getting the companyFacade saved in the session
			CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
			// Parsing LocalDate
			LocalDate endLocalDate = LocalDate.parse(endDate);
			//the getCouponByStartDate function
			return facade.getCouponsByEndDate(endLocalDate).toArray(new Coupon[]{});
		}
	
}

