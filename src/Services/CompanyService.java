package Services;


import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import Exceptions.*;
import Facades.*;
import JavaBeans.*;

@Path("company")
public class CompanyService {

	@Context
	private HttpServletRequest request;
	private static final String FACADE_KEY = "facade";

	public CompanyService() {

	}

	@POST
	@Path("/login/{name}/{password}")
	@Produces(MediaType.TEXT_PLAIN)
	public String login(@PathParam("name")String userName, 
			@PathParam("password")String password)
	{
		try{
			CompanyFacade cf= new CompanyFacade().login(userName, password, ClientType.ADMIN);
			request.getSession().setAttribute(FACADE_KEY, cf);
			return "login successfull";
		}
		catch(LoginException e)
		{
			return "login failed";
		}
		
	}

	@PUT
	@Path("/createCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon createCoupon (Coupon coupon) 
			throws AdminFacadeException
	{
		CompanyFacade facade = (CompanyFacade) request.getSession().getAttribute(FACADE_KEY);
		
		try {
			facade.createCoupon(coupon);
		} catch (CompanyFacadeException| AlreadyExistException e) {
			e.printStackTrace();
		}
			return coupon;
	}
	
	@DELETE
	@Path("/removeCoupon")
	@Produces(MediaType.APPLICATION_JSON)
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
	
	@PUT
	@Path("/updateCoupon")
	@Produces(MediaType.APPLICATION_JSON)
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
	
	@GET
	@Path("/getCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon getCoupon(long couponId) 
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

