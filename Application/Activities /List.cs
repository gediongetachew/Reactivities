using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Quary : IRequest<List<Activity>> {}

            public class Handler : IRequestHandler<Quary, List<Activity>>
            {
            private readonly DataContext _context;
            public Handler (DataContext context)
                {
              _context = context;
                    
                }
                
                public async Task<List<Activity>> Handle(Quary request, CancellationToken cancellationToken)
                {
                    return await _context.Activities.ToListAsync();
                }
            }
        
    }
}