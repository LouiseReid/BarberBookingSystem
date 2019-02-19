package com.example.louisereid.bookingsystem.helpers;

import com.sun.jndi.toolkit.url.Uri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.Optional;

@Service
public class ObjectBuilder {

    public static <T> T build(String url, JpaRepository repo){
        Long id = findIdFromString(url);
        Optional foundObject = repo.findById(id);
        T object = null;
        if(foundObject.isPresent()){
            object = (T) foundObject.get();
            return object;
        }

        return null;
    }

    private static Long findIdFromString(String uriString) {
        Uri objUri = null;
        try {
            objUri = new Uri(uriString);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        String objectPath = objUri.getPath();
        String objectStrId = objectPath.substring(objectPath.lastIndexOf('/') + 1);
        Long objectId = Long.parseLong(objectStrId);
        return objectId;
    }

}
