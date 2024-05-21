from DatabaseConnection import Database

def message_buy(user_id, product_id, product_type_id, message):
    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

    #    INSERT INTO inbox (user_id, product_id, product_type_id, message, time_stamp)
    #    VALUES (1, 1, 1, 'Your product MacBook Pro 16" has been sold.', date_trunc('minute', CURRENT_TIMESTAMP));

        query = "INSERT INTO inbox(user_id, product_id, product_type_id, message) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (user_id, product_id, product_type_id, message))

        connection.commit()

    except Exception as e:
        print(f"Failed to retrieve data (Login): {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)


    