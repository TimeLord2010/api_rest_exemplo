import { DynamoDB } from 'aws-sdk';

function getClient() {
    return new DynamoDB.DocumentClient({
        region: process.env.Region
    })
}

function getTable() {
    const table = process.env.TableName
    if (table == null) throw Error('Null table name.')
    return table
}

export async function insertUser(item: {name: string}) {
    const client = getClient()
    const table = getTable()
    return await client.put({
        TableName: table,
        Item: item,
    }).promise()
}

export async function deleteUser(name: string) {
    const client = getClient()
    const table = getTable()
    return await client.delete({
        TableName: table,
        Key: {
            name: name
        }
    }).promise()
}

export async function getUser(name: string) {
    const client = getClient()
    const table = getTable()
    const result = await client.get({
        TableName: table,
        Key: {
            name: name
        }
    }).promise()
    return result.Item
}

export async function getUsers() {
    const client = getClient()
    const table = getTable()
    const result = await client.scan({
        TableName: table,
        Limit: 50,
    }).promise()
    return result.Items
}

export async function updateUser(name: string, addProps: any, deleteProps: string[] = []) {
    const client = getClient()
    const table = getTable()
    const addEntries = Object.entries(addProps)
    if (addEntries.length > 0) {
        const values = {}
        const updateExp = Object.entries(addProps).map(([x, y]) => {
            const id = `:p${Object.values(values).length}` 
            values[id] = y
            return `${x} = ${id}`
        }).join(', ')
        await client.update({
            TableName: table,
            Key: {
                name: name
            },
            UpdateExpression: `SET ${updateExp}`,
            ExpressionAttributeValues: values
        }).promise()
    }
    if (deleteProps.length > 0) {
        const removeExp = deleteProps.join(', ')
        await client.update({
            TableName: table,
            Key: {
                name: name
            },
            UpdateExpression: `REMOVE ${removeExp}`
        }).promise()
    }
}