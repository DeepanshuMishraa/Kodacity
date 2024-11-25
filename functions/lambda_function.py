import sys
import subprocess
import io

def execute_python_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()

    try:
        exec(code)
        output = output_capture.getvalue()
        print("Out of the code",output)
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    with open('Main.java','w') as f:
        f.write(code)

    try:
        output = subprocess.check_output(['javac','Main.java'],stderr=subprocess.STDOUT,timeout=5)
        output += subprocess.check_output(['java','Main'],stderr=subprocess.STDOUT,timeout=5)
        return output.decode('utf-8')
    except subprocess.CalledProcessError as e:
        return e.output.decode('utf-8')
    except subprocess.TimeoutExpired as e:
        return "Timeout Error"
    finally:
        subprocess.run(['rm','Main.java','Main.class'])

def execute_cpp_code(code):
    with open('Main.cpp','w') as f:
        f.write(code)

    try:
        output = subprocess.check_output(['g++','Main.cpp','-o','Main'],stderr=subprocess.STDOUT,timeout=5)
        output += subprocess.check_output(['./Main'],stderr=subprocess.STDOUT,timeout=5)
        return output.decode('utf-8')
    except subprocess.CalledProcessError as e:
        return e.output.decode('utf-8')
    except subprocess.TimeoutExpired as e:
        return "Timeout Error"
    finally:
        subprocess.run(['rm','Main.cpp','Main'])

def handler(event, context):
    language = event.get('language', 'python')
    code = event.get('code')

    if language == 'python':
        result = execute_python_code(code)
    elif language == 'java':
        result = execute_java_code(code)
    elif language == 'cpp':
        result = execute_cpp_code(code)
    else:
        result = f"Unsupported Language: {language}"

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',  
        },
        'body': result
    }
