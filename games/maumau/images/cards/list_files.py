import os

def list_files_to_txt(filename="file_list.txt"):
    """
    Writes the names of all files in the current directory to a text file.

    Args:
        filename: The name of the text file to create (default: "file_list.txt").
    """

    try:
        with open(filename, "w") as f:  # Open the file in write mode ("w")
            for filename in os.listdir("."):  # Iterate through files in the current directory
                f.write(filename + "\n")  # Write each filename to the file, followed by a newline

        print(f"File list saved to '{filename}'")

    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    list_files_to_txt()  # Call the function to create the file list