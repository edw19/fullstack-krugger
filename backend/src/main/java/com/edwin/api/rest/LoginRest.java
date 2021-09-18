package com.edwin.api.rest;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edwin.api.models.MyUser;
import com.edwin.api.repository.MyUserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@RestController
@CrossOrigin
@RequestMapping("login")
public class LoginRest {

	@Autowired
	MyUserRepository myUserRepository;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping
	public UserSuccess login(@RequestBody Credentials cre) {
		System.out.println(cre.getIdentification());
		System.out.println(cre.getPassword());
		MyUser us = myUserRepository.findByIdentification(cre.getIdentification());
		if (us == null)
			return new UserSuccess();

		boolean passwordMatches = bCryptPasswordEncoder.matches(cre.getPassword(), us.getPassword());

		System.out.println(passwordMatches);
		if (passwordMatches) {
			String token = getJWTToken(cre.getIdentification());
			UserSuccess user = new UserSuccess();
			user.setIdentification(cre.getIdentification());
			user.setToken(token);
			user.setRole(us.getRole());
			return user;
		}
		return new UserSuccess();
	}

	private String getJWTToken(String identification) {
		String secretKey = "my super password";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

		String token = Jwts.builder().setId("softtekJWT").setSubject(identification)
				.claim("authorities",
						grantedAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 360 * 720))
				.signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).compact();

		return "Bearer " + token;
	}

}

class Credentials {
	public Credentials() {
	}

	private String identification;
	private String password;

	public String getIdentification() {
		return identification;
	}

	public void setIdentification(String identification) {
		this.identification = identification;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}

class UserSuccess {

	public UserSuccess() {
	}

	private String identification;
	private String token;
	private String role;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getIdentification() {
		return identification;
	}

	public void setIdentification(String identification) {
		this.identification = identification;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
