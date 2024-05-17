from DatabaseConnection import Database

def register_user(username, password):

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("INSERT INTO user_account(username, password) VALUES ( " + username + ", " + password +")")

        connection.commit()

        rows = cursor.fetchall()
        
        for row in rows:
            print(row)
        cursor.close()

        db_instance.return_connection(connection)
    except Exception as e:
        print(f"Failed to retrieve data: {e}")
    finally:
        if 'db_instance' in locals() and db_instance:
            db_instance.close_all_connections()