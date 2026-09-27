import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from code_execution.executor import ExecutorFactory

class RunCodeView(APIView):
    # permission_classes = [IsAuthenticated] # Commented for demo testing if JWT isn't passed

    def post(self, request):
        code = request.data.get('code')
        language = request.data.get('language')
        input_data = request.data.get('input_data', '')

        if not code or not language:
            return Response({'error': 'Code and language are required.'}, status=400)

        try:
            executor = ExecutorFactory.get_executor(language)
            result = executor.execute(code, input_data)
            return Response(result)
        except ValueError as e:
            return Response({'error': str(e)}, status=400)
        except Exception as e:
            return Response({'error': 'Execution failed.'}, status=500)
