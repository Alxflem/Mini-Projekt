from DatabaseConnection import Database

def get_messages(email):

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT u_id FROM accounts WHERE email = %s", (email,))
        result = cursor.fetchone()

        if result is None:
            return {"error": "Email not found"}, 404

        user_id = result[0]

        cursor.execute("SELECT * FROM inbox WHERE user_id = %s", (user_id))

        connection.commit()
        cursor.close()
        db_instance.return_connection(connection)
        return {"message": "Messages returned successfully!"}, 201
    except Exception as e:
        print(f"Failed to get messages: {e}")
        return {"error": "Failed to get messages"}, 500
    finally:
        if 'db_instance' in locals() and db_instance:
            db_instance.close_all_connections()