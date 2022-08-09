export const getJobs = async (prisma) => {
return (
    await prisma.job.findMany({
        where: {},
        orderBy: [
          {
            id: 'desc',
          },
        ],
        include: {
          user: true,
        },

    })

)
}