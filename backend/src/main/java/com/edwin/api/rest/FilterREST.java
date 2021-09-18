package com.edwin.api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edwin.api.models.MyUser;
import com.edwin.api.repository.MyUserRepository;

@RestController
@CrossOrigin
@RequestMapping("/filtros")
public class FilterREST {

	@Autowired
	MyUserRepository myUserRepository;

	@PostMapping
	private ResponseEntity<MyUser> getEmployee(@RequestBody UserIdentification usr) {
		System.out.println(usr.getIdentification());
		MyUser us = myUserRepository.findByIdentification(usr.getIdentification());
		System.out.println(us);
		return ResponseEntity.ok(us);
	}

}

class UserIdentification {
	private String identification;

	public String getIdentification() {
		return identification;
	}

	public void setIdentification(String identification) {
		this.identification = identification;
	}
}
