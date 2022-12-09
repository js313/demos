package com.example.demo.api;

import com.example.demo.model.Person;
import com.example.demo.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/person")
@RestController
public class PersonController {
    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    public void addPerson(@RequestBody @Valid @NonNull Person person) {
        personService.addPerson(person);
    }

    @GetMapping
    public List<Person> getPersons() {
        return personService.getPersons();
    }

    @DeleteMapping(path = "{id}")
    public String deletePerson(@PathVariable("id") UUID id) {
        if(personService.deletePerson(id) == 1) {
            return "ID not found";
        }
        return "Person deleted";
    }

    @GetMapping(path = "{id}")
    public Person getPerson(@PathVariable("id") UUID id) { return  personService.getPerson(id); }
    
    @PutMapping(path = "{id}")
    public String updatePerson(@PathVariable("id") UUID id,
                               @RequestBody @Valid @NonNull Person newPerson) {
        int response = personService.updatePerson(id, newPerson);
        if(response == 1) return "Person not found";
        return "Person updated";
    }
}
