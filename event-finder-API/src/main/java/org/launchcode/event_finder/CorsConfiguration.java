package org.launchcode.event_finder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {

    private final AuthenticationFilter authenticationFilter;

    @Autowired
    public CorsConfiguration(AuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Allow all origins (modify as needed)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                .allowedHeaders("*"); // Allowed headers (modify as needed)
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/src/main/resources/images/") // Location of your images folder
                .setCachePeriod(0); //disable caching for development
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationFilter)
                // Exclude intercepting requests to "/login" and "/register" endpoints
                .excludePathPatterns("/login", "/register", "/api/events", "/");
    }
}

