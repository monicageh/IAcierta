// src/main/java/etsit/tfg/roscos/service/QuestionService.java
package etsit.tfg.roscos.service;

import etsit.tfg.roscos.dto.AnswerResultDto;
import etsit.tfg.roscos.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Devuelve 25 preguntas aleatorias de la colección
     * questions_es o questions_en según lang.
     */
    public List<Question> getRandomQuestions(String lang) {
        String collection = "questions_" + lang;               // p.ej. "questions_es"
        Aggregation agg = Aggregation.newAggregation(Aggregation.sample(25));
        return mongoTemplate
                .aggregate(agg, collection, Question.class)
                .getMappedResults();
    }

    /**
     * Busca una pregunta por su ID en la colección de lang.
     */
    public Question getQuestionById(String id, String lang) {
        String collection = "questions_" + lang;
        return mongoTemplate.findById(id, Question.class, collection);
    }

    /**
     * Comprueba si la respuesta del jugador y la de chatgpt coincide con respuestaCorrecta.
     */
    public AnswerResultDto checkAnswer(String questionId, String lang, String playerAnswer) {
        Question q = getQuestionById(questionId, lang);
        boolean playerOk   = q.getRespuestaCorrecta()
                              .equalsIgnoreCase(playerAnswer.trim());
        boolean chatgptOk  = q.getRespuestaCorrecta()
                              .equalsIgnoreCase(q.getRespuestaChatgpt().trim());
        return new AnswerResultDto(
            playerOk,
            q.getRespuestaCorrecta(),
            playerAnswer,
            q.getRespuestaChatgpt(),
            chatgptOk  
        );
    }
}
