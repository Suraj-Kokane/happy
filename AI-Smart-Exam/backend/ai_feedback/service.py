import os
import json

class AIFeedbackService:
    @staticmethod
    def generate_feedback(code: str, language: str, score: float, execution_time: float) -> dict:
        api_key = os.environ.get('AI_API_KEY')
        
        # If API key exists, call real AI (simulated here since we don't have a real HTTP call)
        if api_key and api_key != 'your_ai_api_key':
            # Call OpenAI/Gemini
            pass
            
        # Fallback to rule-based feedback
        return AIFeedbackService._generate_fallback_feedback(code, score, execution_time)

    @staticmethod
    def _generate_fallback_feedback(code: str, score: float, execution_time: float) -> dict:
        feedback = {
            'time_complexity': 'O(n) - Rule Based Estimate',
            'space_complexity': 'O(1) - Rule Based Estimate',
            'suggestions': []
        }
        
        if score == 100:
            feedback['feedback'] = "Your solution correctly implements the logic and passes all test cases perfectly."
        elif score >= 50:
            feedback['feedback'] = "Your solution passes some test cases but fails on edge cases."
            feedback['suggestions'].append("Test additional edge cases.")
            feedback['suggestions'].append("Review failed test cases closely.")
        else:
            feedback['feedback'] = "Your solution failed most test cases."
            feedback['suggestions'].append("Check for syntax errors or infinite loops.")
            feedback['suggestions'].append("Ensure the code handles negative input.")

        if 'while' in code or 'for' in code:
            feedback['suggestions'].append("Check if loop conditions can be optimized.")
            
        if execution_time > 1.0:
            feedback['suggestions'].append("Execution time is high. Consider optimizing the algorithm.")

        return feedback
