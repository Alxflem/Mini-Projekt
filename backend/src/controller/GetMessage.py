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

        user_id = result[0]  # This line assumes result is a tuple
        print(f"User ID: {user_id}")  # Debug statement

        query = """
        SELECT 
            inbox.in_id, 
            inbox.user_id, 
            product.name, 
            inbox.product_type_id, 
            inbox.message, 
            inbox.time_stamp 
        FROM 
            inbox 
        JOIN 
            product ON inbox.product_id = product.p_id 
        WHERE 
            inbox.user_id = %s
        """
        cursor.execute(query, (user_id,))

        messages = cursor.fetchall()  # Fetch the messages
        print(f"Messages: {messages}")  # Debug statement

        connection.commit()
        cursor.close()
        db_instance.return_connection(connection)

        return messages, 200  # Return the fetched messages

    except Exception as e:
        print(f"Error: {e}")  # Print the error message
        return {"error": str(e)}, 500