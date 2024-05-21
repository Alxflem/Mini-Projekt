from DatabaseConnection import Database

def get_messages(email):

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT u_id FROM user_account WHERE email = %s", (email,))
        result = cursor.fetchone()

        print(f"Result from user_account query: {result}")  # Debug statement

        if result is None:
            return {"error": "Email not found"}, 404

        user_id = result[0]
        print(f"User ID: {user_id}")  # Debug statement

        cursor.execute("SELECT * FROM inbox WHERE user_id = %s", (user_id,))

        messages = cursor.fetchall()  # Fetch the messages
        print(f"Messages: {messages}")  # Debug statement

        connection.commit()
        cursor.close()
        db_instance.return_connection(connection)
        return {"messages": messages}, 201  # Return the fetched messages
    except Exception as e:
        print(f"Failed to get messages: {e}")
        return {"error": "Failed to get messages"}, 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)