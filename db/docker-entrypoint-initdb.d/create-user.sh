echo "🥚 Trying to create user..."

mongo -- "$MONGO_DATABASE" <<EOF    
    db.createUser({
        user: '$MONGO_USERNAME',
        pwd: '$MONGO_PASSWORD',
        roles: ["readWrite"]
    });
EOF

echo "🐣 User created!"