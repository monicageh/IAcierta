// src/main/java/etsit/tfg/roscos/dto/AnswerResultDto.java
package etsit.tfg.roscos.dto;

public class AnswerResultDto {
    private final boolean correct;
    private final String correctAnswer;
    private final String playerAnswer;
    private final String chatgptAnswer;

    public AnswerResultDto(boolean correct,
                           String correctAnswer,
                           String playerAnswer,
                           String chatgptAnswer) {
        this.correct       = correct;
        this.correctAnswer = correctAnswer;
        this.playerAnswer  = playerAnswer;
        this.chatgptAnswer = chatgptAnswer;
    }

    public boolean isCorrect() {
        return correct;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String getPlayerAnswer() {
        return playerAnswer;
    }

    public String getChatgptAnswer() {
        return chatgptAnswer;
    }
    
    
}
