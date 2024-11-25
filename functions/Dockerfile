FROM public.ecr.aws/lambda/python:3.11

# Update and install system dependencies
RUN yum update -y && \
    yum install -y gcc-c++ java-1.8.0-openjdk-devel

# Set working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy function code
COPY lambda_function.py .

# Set the CMD to your handler
CMD ["lambda_function.handler"]
