package etsit.tfg.roscos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document 
public class Question {

    @Id
    private String id;

    private String pregunta;

    @Field("respuesta_correcta")
    private String respuestaCorrecta;

    @Field("respuesta_chatgpt")
    private String respuestaChatgpt;

    public Question() {
    }

    public Question(String pregunta, String respuestaCorrecta, String respuestaChatgpt) {
        this.pregunta = pregunta;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestaChatgpt = respuestaChatgpt;
    }

    public String getId() {
        return id;
    }

    public String getPregunta() {
        return pregunta;
    }

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public String getRespuestaChatgpt() {
        return respuestaChatgpt;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", pregunta='" + pregunta + '\'' +
                ", respuestaCorrecta='" + respuestaCorrecta + '\'' +
                ", respuestaChatgpt='" + respuestaChatgpt + '\'' +
                '}';
    }
}
