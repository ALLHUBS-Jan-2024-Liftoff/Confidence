package org.launchcode.event_finder;

import org.launchcode.event_finder.Controllers.AuthController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

@Component
public class AuthenticationFilter implements HandlerInterceptor {

    private static final Logger logger = Logger.getLogger(AuthenticationFilter.class.getName());

    @Autowired
    private AuthController authController;

    private static final List<String> whitelist = Arrays.asList("/login", "/register", "/logout", "/css", "/", "/api/events");

    private static boolean isWhitelisted(String path) {
        for (String pathRoot : whitelist) {
            if (path.equals(pathRoot) || path.startsWith(pathRoot + "/")) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws IOException {

        String requestURI = request.getRequestURI();
        logger.info("Request URI: " + requestURI);

        // Don't require sign-in for whitelisted pages
        if (isWhitelisted(requestURI)) {
            logger.info("Request URI is whitelisted.");
            return true;
        }

        HttpSession session = request.getSession(false); // false means do not create new session if none exists
        logger.info("Session: " + session);

        // Check if session contains a valid user
        if (session != null && session.getAttribute("user") != null) {
            logger.info("User is authenticated.");
            return true;
        }

        // User is not authenticated, send unauthorized response
        logger.warning("User is not authenticated. Unauthorized access.");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Unauthorized");
        response.getWriter().flush();
        return false;
    }
}
