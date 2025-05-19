package etsit.tfg.roscos.controller;

import etsit.tfg.roscos.model.Question;
import etsit.tfg.roscos.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    /**
     * Endpoint para obtener una pregunta aleatoria de la colección indicada.
     *
     * @param collection El nombre de la colección ("rae" o "ingles").
     * @return Una pregunta aleatoria con sus respectivos campos.
     */
    @GetMapping("/random/{collection}")
    public Question getRandomQuestion(@PathVariable("collection") String collection) {
        if (!"rae".equalsIgnoreCase(collection) && !"ingles".equalsIgnoreCase(collection)) {
            throw new IllegalArgumentException("Colección no soportada. Las colecciones permitidas son: rae, ingles");
        }
        return questionService.getRandomQuestion(collection.toLowerCase());
    }
}
