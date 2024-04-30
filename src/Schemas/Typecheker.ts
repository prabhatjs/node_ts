import zod from 'zod'

export const insertEmpData=zod.object({
    empno:zod.number(),
    ename:zod.string(),
    sal:zod.number()
})
export const UpdateEmpData=zod.object({
    empno:zod.number(),
    ename:zod.string(),
    sal:zod.number()
});
export const DeleteEmpData=zod.object({
    empno:zod.number()
})