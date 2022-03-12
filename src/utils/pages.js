export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (lotalPages) => {
    let result = [];
    for (let i = 0; i < lotalPages; i++) {
        result.push(i + 1);
    }

    return result;
}