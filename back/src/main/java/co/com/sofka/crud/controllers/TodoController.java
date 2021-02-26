package co.com.sofka.crud.controllers;

import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping("/todos")
    public Iterable<Todo> list(){
        return service.list();
    }
    
    @PostMapping("/todo")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Todo todo) {
        Todo nuevoTodo = null;
        Map<String, Object> response = new HashMap<>();

        try {
            nuevoTodo = service.save(todo);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error En La Consulta O Query Por Que Los Nombres No Coinciden");
            response.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("mensaje", "La Tarea Fue Creada Exitosamente!");
        response.put("todo", nuevoTodo);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/todo")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "/{id}/todo")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
