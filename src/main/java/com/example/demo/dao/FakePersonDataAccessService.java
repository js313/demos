package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Repository("fakeDao")
public class FakePersonDataAccessService implements PersonDao {
    private static List<Person> DB = new ArrayList<>();
    @Override
    public int insertPerson(UUID id, Person person) {
        DB.add(new Person(id, person.getName()));
        return 0;
    }

    @Override
    public List<Person> getPersons() {
        return DB;
    }

    @Override
    public int deletePerson(UUID id) {
        boolean deleted=false;
        for(int i=0;i<DB.size();i++) {
            if(DB.get(i).getId().compareTo(id) == 0) {
                DB.remove(i);
                deleted=true;
                break;
            }
        }
        if(deleted) return 1;
        return 0;
    }

    @Override
    public Person getPerson(UUID id) {
        for(int i=0;i<DB.size();i++) {
            if(DB.get(i).getId().compareTo(id) == 0) {
                return DB.get(i);
            }
        }
        return null;
    }

    @Override
    public int updatePerson(UUID id, Person newPerson) {
        Person person=null;
        for(int i=0;i<DB.size();i++) {
            if(DB.get(i).getId().compareTo(id) == 0) {
                person = DB.get(i);
                DB.set(i, newPerson);
            }
        }
        if(person == null) return 1;
        return 0;
    }
}
