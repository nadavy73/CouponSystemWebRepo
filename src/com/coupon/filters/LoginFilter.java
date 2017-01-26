package com.coupon.filters;

import java.io.IOException;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.coupon.services.AdminService;


@WebFilter()
public class LoginFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession(false);
		
		
		if (httpRequest.getRequestURI().contains("/login/"))
		{
			chain.doFilter(request, response);
			return;
		}
		else
		{
			if (session == null) {
				System.out.println("no session!");
				httpResponse.sendRedirect("/WebCouponProject/#/login");
				return;
				
			} else if (session.getAttribute(AdminService.FACADE_KEY) == null){
				System.out.println("no facade in session!");
				httpResponse.sendRedirect("/WebCouponProject/#/login");
				return;
			} else {
				
				chain.doFilter(request, response);
			}
		}
		
		

	}

	@Override
	public void init(FilterConfig config) throws ServletException {
	}

	@Override
	public void destroy() {
	}
}