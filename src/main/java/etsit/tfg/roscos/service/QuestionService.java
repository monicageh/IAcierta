package etsit.tfg.roscos.service;

import etsit.tfg.roscos.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Obtiene una pregunta aleatoria de la colección especificada.
     * @param collectionName El nombre de la colección ("rae" o "ingles").
     * @return Una pregunta aleatoria con los campos: pregunta, respuesta_correcta y respuesta_chatgpt.
     */
    public Question getRandomQuestion(String collectionName) {
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.sample(1));
        AggregationResults<Question> result = mongoTemplate.aggregate(aggregation, collectionName, Question.class);
        return result.getUniqueMappedResult();
    }
}
