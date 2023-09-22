export const permit = (db) => {
    return async (req, res, next) => {
        if (!req.query.userId) return res.status(401).send({'message': 'Отказано в доступе'});
    
        const {userId, collectionId, action, fields} =  req.query;

        const access = await db.getAccess(userId, collectionId);
    
        if (!access) return res.status(403).send({'message': 'Отказано в доступе'});
        if (!access.permissions[action]) return res.status(403).send({'message': 'Отказано в доступе'});
    
        if (action === 'read' || action === 'update') {
            if (!fields || !access.permissions[action].fields.includes(fields)) {
                return res.status(403).send({'message': 'Отказано в доступе к полям'});
            };
        };
  
      next();
    };
};