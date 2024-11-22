package com.core.backend.helper;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class TimeConversion {

    public static Timestamp parseToTimestamp(String date) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return new Timestamp(sdf.parse(date).getTime());
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format: " + date);
        }
    }
}
