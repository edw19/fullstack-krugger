package com.edwin.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.edwin.api.models.MyUser;
import com.edwin.api.repository.MyUserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private MyUserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		MyUser us = repo.findByIdentification(username);
		
		if( us == null) throw new Error("credenciales invalidas");
		
		List<GrantedAuthority> roles = new ArrayList<>();

		roles.add(new SimpleGrantedAuthority("ADMIN"));
		UserDetails userDet = new User(us.getIdentification(), us.getPassword(), roles);
		System.out.println("jejej" + userDet);
		return userDet;
	}

}
