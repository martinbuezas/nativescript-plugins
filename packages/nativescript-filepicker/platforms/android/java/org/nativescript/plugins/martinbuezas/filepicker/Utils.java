package org.nativescript.plugins.martinbuezas.filepicker;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Utils {
  public static void copy(InputStream source, OutputStream target) throws IOException {
    byte[] buf = new byte[4096];
    int length;
    while ((length = source.read(buf)) > 0) {
      target.write(buf, 0, length);
    }
  }
}
