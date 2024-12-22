FROM public.ecr.aws/lambda/python:3.11

RUN yum update -y && \
    yum install -y gcc-c++ java-1.8.0-openjdk-devel

WORKDIR ${LAMBDA_TASK_ROOT}


COPY requirements.txt .
RUN pip install -r requirements.txt


COPY lambda_function.py .


CMD ["lambda_function.handler"]
