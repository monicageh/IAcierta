// src/main/java/etsit/tfg/roscos/dto/AnswerRequestDto.java
package etsit.tfg.roscos.dto;

public class AnswerRequestDto {
    private String questionId;  // id de Question
    private String lang;        // "es" o "en"
    private String answer;      // texto del jugador
    
    public String getQuestionId() {
        return questionId;
    }
    public String getLang() {
        return lang;
    }
    public String getAnswer() {
        return answer;
    }
    @Override
    public String toString() {
        return "AnswerRequestDto [questionId=" + questionId + ", lang=" + lang + ", answer=" + answer + "]";
    }

    
}
