package com.code.travel_blog.payload.response;

public class ResponseData<T> {
    private T data;
    private String message;

    public ResponseData() {
    }

    public ResponseData(String message) {
        this.message = message;
    }

    public ResponseData(T data, String message) {
        this.data = data;
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
