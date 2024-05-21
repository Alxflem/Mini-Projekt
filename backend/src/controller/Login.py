from DatabaseConnection import Database

def login_user(email, password):
    connection = None
    cursor = None

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        query = "SELECT * FROM user_account WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()

        if user:
            print("User data retrieved from database:", user)
            print("Username:", user[1])
            print("Password:", user[2])
            print("Date of birth:", user[3])
            print("First name:", user[4])
            print("Last name:", user[5])
            print("Email:", user[6])
            user_data = {
                'username': user[1],
                'password': user[2],
                'dateOfBirth': user[3],
                'firstname': user[4],
                'lastname': user[5],
                'email': user[6],
            }
            print("User data: ", user_data)
            return user_data
        else:
            print("No matching user found.")
            return None
    except Exception as e:
        print(f"Failed to retrieve data (Login): {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)
