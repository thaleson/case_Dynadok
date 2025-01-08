/**
 * A set of utility functions for reading and writing JSON data to files.
 * 
 * These functions handle reading data from a file and writing data to a file in JSON format.
 * They return the parsed data or handle errors gracefully when the file operations fail.
 * 
 * @module fileUtils
 */

import fs from "fs";

/**
 * Reads the contents of a file and parses it as JSON.
 * 
 * @param {string} filePath - The path to the file to read.
 * @returns {any[]} The parsed JSON data from the file, or an empty array if the file does not exist or an error occurs.
 * 
 * @throws {Error} If there is an issue reading or parsing the file, an empty array is returned.
 */
export function readFileSync(filePath: string): any[] {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

/**
 * Writes data to a file in JSON format.
 * 
 * @param {string} filePath - The path to the file to write.
 * @param {any} data - The data to write to the file.
 * @returns {void} This function does not return anything.
 * 
 * @throws {Error} If there is an issue writing to the file, an error will be thrown.
 */
export function writeFileSync(filePath: string, data: any): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
