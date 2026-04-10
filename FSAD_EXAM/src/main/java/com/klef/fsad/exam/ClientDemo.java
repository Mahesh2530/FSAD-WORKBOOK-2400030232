package com.klef.fsad.exam;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.util.Date;

public class ClientDemo 
{
 public static void main(String[] args) 
 {
  Configuration cfg = new Configuration();
  cfg.configure();

  SessionFactory sf = cfg.buildSessionFactory();
  Session session = sf.openSession();

  Transaction tx = session.beginTransaction();

  Department dept = new Department();
  dept.setName("Computer Science");
  dept.setDescription("CSE Department");
  dept.setDate(new Date());
  dept.setStatus("Active");

  session.save(dept);

  System.out.println("Department Inserted Successfully");

  tx.commit();

  
  Transaction tx2 = session.beginTransaction();

  Department d = session.get(Department.class, 1);

  if(d != null)
  {
   session.delete(d);
   System.out.println("Department Deleted Successfully");
  }
  else
  {
   System.out.println("Department Not Found");
  }

  tx2.commit();

  session.close();
  sf.close();
 }
}
