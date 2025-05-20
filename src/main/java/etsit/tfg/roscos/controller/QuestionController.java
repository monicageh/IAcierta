// src/main/java/etsit/tfg/roscos/controller/QuestionController.java
package etsit.tfg.roscos.controller;

import etsit.tfg.roscos.dto.AnswerRequestDto;
import etsit.tfg.roscos.dto.AnswerResultDto;
import etsit.tfg.roscos.model.Question;
import etsit.tfg.roscos.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    /**
     * Inicio de partida:
     * devuelve 25 preguntas aleatorias de la colección según el idioma.
     * El frontend deberá hacer esto al elegir idioma y cargar el rosco.
     */
    @GetMapping("/start/{lang}")
    public List<Question> startGame(@PathVariable String lang) {
        return questionService.getRandomQuestions(lang);
    }

    /**
     * Comprobar respuesta:
     * recibe {questionId, lang, answer} y devuelve resultado.
     */
    @PostMapping("/check")
    public AnswerResultDto checkAnswer(@RequestBody AnswerRequestDto payload) {
        return questionService.checkAnswer(
            payload.getQuestionId(),
            payload.getLang(),
            payload.getAnswer()
        );
    }
}
