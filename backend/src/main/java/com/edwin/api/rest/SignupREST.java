package com.edwin.api.rest;

import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edwin.api.models.MyUser;
import com.edwin.api.repository.MyUserRepository;

@RestController
@CrossOrigin
@RequestMapping ("/signup")
public class SignupREST {
	
	@Autowired
	private MyUserRepository repo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	
	@PostMapping
	private ResponseEntity<MyUser> createUser(@RequestBody MyUser user) {
		try {
			user.setPassword(encoder.encode(user.getIdentification()));
			MyUser newUser = repo.save(user);
			return ResponseEntity.created(new URI("/employee/" + newUser.getId())).body(newUser);
		} catch (Exception e) {
			System.out.println("aaaaa"+e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
