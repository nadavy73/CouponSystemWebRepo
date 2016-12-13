package Services;

import java.sql.SQLException;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlRootElement;

import Exceptions.AlreadyExistException;
import Exceptions.CouponException;
import Exceptions.CustomerFacadeException;
import Exceptions.DoesNotExistException;
import Exceptions.LoginException;
import Facades.ClientType;

import Facades.CustomerFacade;
import JavaBeans.Coupon;
import JavaBeans.CouponType;


@XmlRootElement
@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerService {
	
	@Context
	private HttpServletRequest request;
	private static final String FACADE_KEY = "facade";

	public CustomerService() {

	}
	//V
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
	
	
//V
	@PUT
	@Path("/purchaseCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public Coupon purchaseCoupon (long id) throws DoesNotExistException, CustomerFacadeException, CouponException, SQLException, AlreadyExistException 
			
	{
		CustomerFacade facade = (CustomerFacade) request.getSession().getAttribute(FACADE_KEY);
		

			return facade.purchaseCoupon(id);
	}
	
	//V
	@GET
	@Path("/getAllPurchasedCoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon[]  getAllPurchasedCoupons()
	{
		CustomerFacade facade = (CustomerFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			Coupon[] coupons = facade.getAllPurchasedCoupons().toArray(new Coupon[]{});
			
			for (Coupon coupon: coupons){
				System.out.println(coupon);
			}
			
			return coupons;
		} catch (CustomerFacadeException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	
	//V
	@GET
	@Path("/getAllPurchasedCouponsByType/{couponType}")
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

	//V
	@GET
	@Path("/getAllPurchasedCouponsByMaxPrice/{maxPrice}")
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



