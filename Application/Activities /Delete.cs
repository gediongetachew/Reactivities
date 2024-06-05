using Application.Activities.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;


            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
               
                _context.Activities.Remove(activity);
               var result =  await _context.SaveChangesAsync() > 0;
               if(!result) return  Result<Unit>.Failer("Failed to delete Activity");

             return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}