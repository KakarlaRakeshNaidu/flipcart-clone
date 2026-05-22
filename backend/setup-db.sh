#!/bin/bash
# DB setup script — run as postgres system user

# Set postgres password
su postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'password';\""

# Create database if it doesn't exist
DB_EXISTS=$(su postgres -c "psql -tAc \"SELECT 1 FROM pg_database WHERE datname='flipkart_clone'\"")
if [ "$DB_EXISTS" != "1" ]; then
    su postgres -c "createdb flipkart_clone"
    echo "Created database: flipkart_clone"
else
    echo "Database flipkart_clone already exists"
fi

echo "---"
echo "Database setup complete!"
su postgres -c "psql -l" | grep flipkart
