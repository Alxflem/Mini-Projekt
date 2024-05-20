import psycopg2

connection = psycopg2.connect(
    host="pgserver.mau.se",
    dbname="g16_mini_project",
    user="an4119",
    password="gh796kh6",
    port=5432
)

cursor = connection.cursor()

cursor.execute("SELECT * FROM user_account")

rows = cursor.fetchall()
for row in rows:
    print(row)

connection.commit()
cursor.close()
connection.close()