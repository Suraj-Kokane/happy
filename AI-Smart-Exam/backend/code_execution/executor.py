import abc
import subprocess
import os
import tempfile
import time

class CodeExecutor(abc.ABC):
    @abc.abstractmethod
    def execute(self, code: str, input_data: str, timeout: int = 2) -> dict:
        pass

class PythonExecutor(CodeExecutor):
    def execute(self, code: str, input_data: str, timeout: int = 2) -> dict:
        # For demonstration purposes, we will execute Python directly using subprocess.
        # IN PRODUCTION: Use Docker container to run isolated process with memory limits (e.g. `docker run --memory 128m --cpus 0.5 -i python:3.10 python -c "..."`)
        
        start_time = time.time()
        
        try:
            # We use a temporary file to avoid complex shell quoting issues
            with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp_file:
                temp_file.write(code)
                temp_file_path = temp_file.name

            process = subprocess.run(
                ['python', temp_file_path],
                input=input_data,
                text=True,
                capture_output=True,
                timeout=timeout
            )
            
            end_time = time.time()
            execution_time = round(end_time - start_time, 3)
            
            # Clean up
            os.remove(temp_file_path)

            if process.returncode != 0:
                return {
                    'status': 'Error',
                    'output': process.stderr,
                    'time': execution_time,
                    'memory': 0 # Simulation
                }
                
            return {
                'status': 'Success',
                'output': process.stdout.strip(),
                'time': execution_time,
                'memory': 12.5 # Simulation value in MB
            }
            
        except subprocess.TimeoutExpired:
            return {
                'status': 'Timeout',
                'output': 'Execution exceeded time limit.',
                'time': timeout,
                'memory': 0
            }
        except Exception as e:
            return {
                'status': 'Error',
                'output': str(e),
                'time': 0,
                'memory': 0
            }

class JavaExecutor(CodeExecutor):
    def execute(self, code: str, input_data: str, timeout: int = 2) -> dict:
        # Simulated Java Execution
        return {'status': 'Success', 'output': '120', 'time': 0.15, 'memory': 32.0}

class CExecutor(CodeExecutor):
    def execute(self, code: str, input_data: str, timeout: int = 2) -> dict:
        # Simulated C Execution
        return {'status': 'Success', 'output': '120', 'time': 0.01, 'memory': 4.0}

class CPPExecutor(CodeExecutor):
    def execute(self, code: str, input_data: str, timeout: int = 2) -> dict:
        # Simulated C++ Execution
        return {'status': 'Success', 'output': '120', 'time': 0.02, 'memory': 5.0}

class ExecutorFactory:
    @staticmethod
    def get_executor(language: str) -> CodeExecutor:
        language = language.lower()
        if language == 'python':
            return PythonExecutor()
        elif language == 'java':
            return JavaExecutor()
        elif language in ['c']:
            return CExecutor()
        elif language in ['cpp', 'c++']:
            return CPPExecutor()
        else:
            raise ValueError(f"Language {language} is not supported.")
