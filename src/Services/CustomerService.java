package Services;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import Exceptions.AdminFacadeException;
import Exceptions.AlreadyExistException;
import Exceptions.CompanyFacadeException;
import Exceptions.CouponException;
import Exceptions.CustomerFacadeException;
import Exceptions.DoesNotExistException;
import Exceptions.LoginException;
import Facades.ClientType;
import Facades.CompanyFacade;
import Facades.CustomerFacade;
import JavaBeans.Coupon;
import JavaBeans.CouponType;
import JavaBeans.Customer;

@Path("customer")
public class CustomerService {
	
	@Context
	private HttpServletRequest request;
	private static final String FACADE_KEY = "facade";

	public CustomerService() {

	}
	
	@POST
	@Path("/login/{name}/{password}")
	@Produces(MediaType.TEXT_PLAIN)
	public String login(@PathParam("name")String userName, 
			@PathParam("password")String password)
	{
		try{
			CustomerFacade custf= new CustomerFacade().login(userName, password, ClientType.CUSTOMER);
			request.getSession().setAttribute(FACADE_KEY, custf);
			return "login successfull";
		}
		catch(LoginException e)
		{
			return "login failed";
		}
		
	}

	@PUT
	@Path("/purchaseCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon purchaseCoupon (Coupon coupon) throws DoesNotExistException 
			
	{
		CustomerFacade facade = (CustomerFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.purchaseCoupon(coupon);
		} catch (CustomerFacadeException | CouponException e) {
			e.printStackTrace();
		}
			return coupon;
	}
	
	@GET
	@Path("/getAllPurchasedCoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Coupon> getAllPurchasedCoupons()
	{
		CustomerFacade facade = (CustomerFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.getAllPurchasedCoupons();
		} catch (CustomerFacadeException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@GET
	@Path("/getAllPurchasedCouponsByType")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Coupon> getAllPurchasedCouponsByType(@PathParam("couponType") CouponType couponType) throws DoesNotExistException
	{
		CustomerFacade facade = (CustomerFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.getAllPurchasedCouponsByType(couponType);
		} catch (CustomerFacadeException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@GET
	@Path("/getAllPurchasedCouponsByMaxPrice")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Coupon> getAllPurchasedCouponsByMaxPrice(@PathParam("maxPrice") double maxPrice) 
			throws DoesNotExistException
	{
		CustomerFacade facade = (CustomerFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			return facade.getAllPurchasedCouponsByMaxPrice(maxPrice);
		} catch (CustomerFacadeException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}



