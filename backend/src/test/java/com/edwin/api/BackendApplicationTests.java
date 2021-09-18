package com.edwin.api;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.edwin.api.models.MyUser;
import com.edwin.api.repository.MyUserRepository;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	private MyUserRepository repo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Test
	void createUserTest() {
		MyUser us = new MyUser();
		us.setIdentification("0401869709");
		us.setPassword(encoder.encode("asd"));
		
		MyUser user = repo.save(us);
		
		assertTrue(user.getPassword().equalsIgnoreCase(us.getPassword()));
		
	}

}
