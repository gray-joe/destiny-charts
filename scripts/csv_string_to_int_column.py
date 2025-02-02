import csv
import sys

def convert_column_to_int(input_file, output_file, columns_to_convert):
    with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames
        
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            for column in columns_to_convert:
                if column in row and row[column]:
                    # Remove quotes and commas, then convert to int
                    try:
                        row[column] = row[column].replace('"', '').replace(',', '')
                    except AttributeError:
                        # Skip if value is already an int or None
                        continue
            writer.writerow(row)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python script.py input.csv output.csv column1 [column2 ...]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    columns_to_convert = sys.argv[3:]
    
    convert_column_to_int(input_file, output_file, columns_to_convert)